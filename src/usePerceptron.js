import { useCallback, useEffect, useMemo, useState } from "react"

const nj = window.nj

/**
 * EXAMPLE INPUTS
 * --------------
 * x = [
 *       [1, 1],
 *       [1, -1],
 *       [-1, 1],
 *       [-1, -1],
 *     ] : (4, 2)
 * y = [
 *       1,
 *       0,
 *       0,
 *       0,
 *     ] : (4) = AND
 */

/**
 * 
 * @param {nj.NdArray} x
 * @returns {nj.NdArray} 
 */
function getW(x) {
  const [, dim] = x.shape
  return nj.random(dim)
}

/**
 * 
 * @param {nj.NdArray} x 
 * @returns {nj.NdArray}
 */
function activation(x) {
  return nj.array(x.tolist().map(v => v >= 0 ? 1 : -1))
}

export const usePerceptron = ({
  xInput,
  yInput,
  E = 0.5
}) => {
  const x = useMemo(() => nj.array(xInput), [])
  const [w, setW] = useState(nj.array([]))
  const [err, setErr] = useState(Math.random())
  const [epochs, setEphos] = useState(0)

  const wRaw = useMemo(() => w.tolist(), [w])

  useEffect(() => {
    setW(getW(x))
  }, [x])

  const ajust = useCallback((position) => {
    const complement = 2*E*yInput[position]
    const xSection = nj.array(x.tolist()[position]).multiply(complement)
    setW(w => w.add(xSection))
    setErr(err => err + (complement*(-1)))
  }, [yInput, E, x, setW, setErr])

  const cycle = useCallback(() => activation(nj.tanh(x.dot(w).subtract(err))), [x, w, err])

  const evaluate = useCallback((yExp) => {
      const list = yExp.tolist()
      debugger
      let learn = true
      for (let i = 0; i < list.length; i++) {
        if(list[i] !== yInput[i]) {
          learn = false
          ajust(i)
          break
        }
      }
      return learn
  },[yInput, ajust])

  const toTrain = useCallback((maxEpochs = 10) => {
    const yExp = cycle()
    return evaluate(yExp)
  }, [cycle, evaluate])

  const test = useCallback((x) => {
    const xNj = nj.array(x)
    return activation(nj.tanh(xNj.dot(w).subtract(err))).tolist()
  }, [w, err])

  return {
    toTrain,
    test,
    w: wRaw,
    err,
  }
}

export class Core {

  /**
   * 
   * @param {array} x 
   * @param {number[]} y 
   * @param {number} E
   */
  constructor(x, y, E = 0.05) {
    this.x = nj.array(x)
    this.y = y
    this.w = getW(this.x)
    this.err = Math.random()
    this.E = E
  }


  #cycle() {
    return activation(nj.tanh(this.x.dot(this.w).subtract(this.err)))
  }

  /**
 * 
 * @param {nj.NdArray} yExp
 */
  #eval(yExp) {
    const list = yExp.tolist()
    let learn = true
    for (let i = 0; i < list.length; i++) {
      if(list[i] !== this.y[i]) {
        learn = false
        this.#ajust(i)
        break
      }
    }
    return learn
  }

  /**
   * @param {number} position
   */
  #ajust(position, list) {
    const errAlpha = 2*this.E*this.y[position]
    const xSection = nj.array(this.x.tolist()[position]).multiply(errAlpha)
    this.w = this.w.add(xSection)
    this.err = this.err + (errAlpha*(-1))
  }

  /**
   * 
   * @param {number} ephos 
   */
  toTrain(ephos) {
    let i = 0
    while(i < ephos) {
      const yExp = this.#cycle()
      if (this.#eval(yExp)) {
        break
      }
      i++
    }
    return i
  }

  /**
   * 
   * @param {number[]} x 
   */
  test(x) {
    const xNj = nj.array(x)
    return activation(nj.tanh(xNj.dot(this.w).subtract(this.err))).tolist()
  }
}