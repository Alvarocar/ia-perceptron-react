import "./_perceptron.scss"

const Perceptron = () => {
  return (
    <main className="perceptron">
      <div className="perceptron__dendrite perceptron__dendrite--1">
        <div className="perceptron__x">
          <input type="number" />
        </div>
        <div className="perceptron__w perceptron__w--w1"></div>
      </div>
      <div className="perceptron__dendrite perceptron__dendrite--2">
        <div className="perceptron__x">
          <input type="number" />
        </div>
        <div className="perceptron__w perceptron__w--w2"></div>
      </div>
      <div className="perceptron__core"></div>
      <div className="perceptron__activation-function"></div>
      <div className="perceptron__b"></div>
    </main>
  )
}

export default Perceptron