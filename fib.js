/**
 * TO RUN:
 * node run fib.js <VALUE>
 * ex: node run fib.js 10
 */

const value = parseInt(process.argv[2]);
let SLOW_COMP = 0;
let FAST_COMP = 0;

// O(2^n)
const slowFib = (n) => {
    SLOW_COMP++
    return n < 2
        ? n
        : slowFib(n - 1) + slowFib(n - 2)
}

// O(n)
const fastFib = (n) => {
    const memo = new Map()
    memo.set(0, 0)
    memo.set(1, 1)
    const bottomUp = (value, cache = memo) => {
        FAST_COMP++
        return cache.has(value)
            ? cache.get(value)
            : cache.set(value, bottomUp(value - 1, cache) + bottomUp(value - 2, cache))
    }
    return bottomUp(n)
}

const slowNow = performance.now()
slowFib(value)
const slowThen = performance.now()
const slowTime = slowThen - slowNow

console.log('slowFib(', value, '): ', SLOW_COMP, 'compuations in', slowThen.toFixed(2), 'ms')

const fastNow = performance.now()
fastFib(value)
const fastThen = performance.now()
const fastTime = fastThen - fastNow

const comparison = slowTime / fastTime

console.log('fastFib(', value, '): ', FAST_COMP, 'computations in', fastTime.toFixed(2), 'ms / ', comparison.toFixed(2), '% faster')