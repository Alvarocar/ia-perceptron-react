import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import TrainForm from "./trainForm"
import { Core, usePerceptron } from "./usePerceptron"
import "./_perceptron.scss"

const core = new Core([[1, 1], [1, -1], [-1, 1], [-1, -1]], [1, -1, -1, -1])

const Perceptron = () => {
  const [w, setW] = useState(core.w.tolist())
  const [err, setErr] = useState(core.err)
  const { register, handleSubmit } = useForm()
  const [result, setResult] = useState(0)
  const [epochs, setEpochs] = useState(0)

  const handleTest = useCallback((data) => {
    const [y] = core.test(Object.values(data).map(v => Number(v) || 0))
    setResult(y)
  }, [setResult])

  const handleTrain = useCallback((data) => {
    setEpochs(core.toTrain(data.ephos))
    setW(core.w.tolist())
    setErr(core.err)
  }, [setEpochs, setW])

  return (
    <main className="perceptron">
      <TrainForm onSubmit={handleTrain} />
      <div className="perceptron__epochs">{epochs}</div>
      <form onSubmit={handleSubmit(handleTest)}>
        <div className="perceptron__dendrite perceptron__dendrite--1">
          <div className="perceptron__x">
            <input type="number" step="0.0000001" {...register("x1")} />
          </div>
          <div className="perceptron__w perceptron__w--w1">{w[0] && w[0].toFixed(2)}</div>
        </div>
        <div className="perceptron__dendrite perceptron__dendrite--2">
          <div className="perceptron__x">
            <input type="number" step="0.0000001" {...register("x2")} />
          </div>
          <div className="perceptron__w perceptron__w--w2">{w[1] && w[1].toFixed(2)}</div>
        </div>

        <button className="perceptron__submit" type="submit">Ejecutar Prueba</button>
      </form>

      <div className="perceptron__core"></div>
      <div className="perceptron__activation-function"></div>
      <div className="perceptron__b">{err && err.toFixed(2)}</div>
      <div className="perceptron__y">{result}</div>
    </main>
  )
}

export default Perceptron