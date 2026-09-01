import { ExerciseStep } from '../types/mathquest';

/**
 * Clean and normalize mathematical strings for evaluation
 */
export function normalizeMathString(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '') // Remove all whitespaces
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/,/g, '.')
    .replace(/\\left|\\right/g, '')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
    .replace(/\$/g, '');
}

/**
 * Parses pure numerical values, including fractions like "5/2" or "-1/4"
 */
function parseNumericalValue(str: string): number | null {
  const norm = normalizeMathString(str);
  if (!norm) return null;

  // Pure integer or decimal (e.g. "2.5", "-4", "+12.0")
  if (/^[+-]?\d+(\.\d+)?$/.test(norm)) {
    const val = parseFloat(norm);
    return isNaN(val) ? null : val;
  }

  // Pure numeric fraction (e.g. "5/2", "-15/4", "+1/3")
  const fracMatch = norm.match(/^([+-]?\d+(\.\d+)?)\/([+-]?\d+(\.\d+)?)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[3]);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }

  return null;
}

/**
 * Prepares algebraic expression for safe evaluation (e.g. "2x+1" -> "2*x+1", "x^2" -> "x**2")
 */
function prepareAlgebraicExpr(expr: string): string {
  return normalizeMathString(expr)
    .replace(/\^/g, '**')
    .replace(/([0-9])([a-zA-Z(])/g, '$1*$2')
    .replace(/([a-zA-Z)])([0-9])/g, '$1*$2')
    .replace(/\)\(/g, ')*(');
}

/**
 * Test numerical or algebraic equivalence for mathematical expressions
 */
export function isMathematicallyEquivalent(userAnswer: string, expectedAnswer: string): boolean {
  const normUser = normalizeMathString(userAnswer);
  const normExpected = normalizeMathString(expectedAnswer);

  if (!normUser || !normExpected) return false;
  if (normUser === normExpected) return true;

  // 1. Pure Numerical & Fractional Check
  const numUser = parseNumericalValue(normUser);
  const numExpected = parseNumericalValue(normExpected);
  if (numUser !== null && numExpected !== null) {
    return Math.abs(numUser - numExpected) < 0.0001;
  }

  // 2. Algebraic expression test (sampling test for 1-variable equations like x or n)
  // Only attempt if both expressions contain variables and look algebraic
  if (/[a-zA-Z]/.test(normUser) && /[a-zA-Z]/.test(normExpected)) {
    try {
      const userExpr = prepareAlgebraicExpr(normUser);
      const expectedExpr = prepareAlgebraicExpr(normExpected);

      const safeEval = (expr: string, val: number) => {
        // Safe evaluation without access to globals
        const fn = new Function('x', 'n', `return (${expr});`);
        return fn(val, val);
      };

      const testValues = [-3, -1, 0, 1.5, 4];
      for (const val of testValues) {
        const evalUser = safeEval(userExpr, val);
        const evalExpected = safeEval(expectedExpr, val);
        if (typeof evalUser !== 'number' || typeof evalExpected !== 'number' || isNaN(evalUser) || isNaN(evalExpected)) {
          return false;
        }
        if (Math.abs(evalUser - evalExpected) > 0.0001) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Evaluate step answer and return result with feedback
 */
export function evaluateStepAnswer(step: ExerciseStep, userAnswer: string): {
  isCorrect: boolean;
  matchedFeedback?: string;
} {
  for (const expected of step.expectedAnswers) {
    if (isMathematicallyEquivalent(userAnswer, expected)) {
      return { isCorrect: true };
    }
  }

  // Check common error feedback
  if (step.errorFeedback) {
    for (const [errorPattern, feedback] of Object.entries(step.errorFeedback)) {
      if (
        normalizeMathString(errorPattern) === normalizeMathString(userAnswer) ||
        isMathematicallyEquivalent(userAnswer, errorPattern)
      ) {
        return { isCorrect: false, matchedFeedback: String(feedback) };
      }
    }
  }

  return { isCorrect: false };
}
