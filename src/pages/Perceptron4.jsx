import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import TrainForm from "../trainForm";
import { Core } from "../usePerceptron";
import { x as xInputs, y as yInputs } from "../util/get4Inputs";

const core = new Core(xInputs, yInputs);

const Perceptron4 = () => {



  const [w, setW] = useState(core.w.tolist());
  const [err, setErr] = useState(core.err);
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(0);
  const [epochs, setEpochs] = useState(0);

  const handleTest = useCallback(
    (data) => {
      const [y] = core.test(Object.values(data).map((v) => Number(v) || 0));
      setResult(y);
    },
    [setResult]
  );

  const handleTrain = useCallback(
    (data) => {
      setEpochs(core.toTrain(data.ephos));
      setW(core.w.tolist());
      setErr(core.err);
    },
    [setEpochs, setW]
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Neurona de cuatro entradas</h1>
      <main className="perceptron perceptron-4-inputs">
        <TrainForm onSubmit={handleTrain} />
        <div className="perceptron__epochs">{epochs}</div>
        <form onSubmit={handleSubmit(handleTest)}>
          {w.map((v, k) => (
            <div key={k} className={`perceptron__dendrite perceptron__dendrite--${k + 1}`}>
              <div className="perceptron__x">
                <input type="number" step="0.0000001" {...register(`x${k + 1}`)} />
              </div>
              <div className={`perceptron__w perceptron__w--w${k + 1}`}>
                {v.toFixed(2)}
              </div>
            </div>
          ))}
          <button className="perceptron__submit" type="submit">
            Ejecutar Prueba
          </button>
        </form>
        <div className="perceptron__core"></div>
        <div className="perceptron__activation-function"></div>
        <div className="perceptron__b">{err && err.toFixed(2)}</div>
        <div className="perceptron__y">{result}</div>
      </main>
    </>
  );
};

export default Perceptron4;
