import { useState } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Calculator</h1>
        
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="mb-6">
            <div className="bg-gray-900 rounded-lg p-4 text-right">
              <div className="text-3xl font-mono text-white break-all">
                {display}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button
              onClick={clear}
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Clear
            </Button>
            <Button
              onClick={() => performOperation('÷')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ÷
            </Button>
            <Button
              onClick={() => performOperation('×')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ×
            </Button>

            <Button
              onClick={() => inputNumber(7)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber(8)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber(9)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              9
            </Button>
            <Button
              onClick={() => performOperation('-')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              -
            </Button>

            <Button
              onClick={() => inputNumber(4)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber(5)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber(6)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              6
            </Button>
            <Button
              onClick={() => performOperation('+')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              +
            </Button>

            <Button
              onClick={() => inputNumber(1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber(2)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber(3)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              3
            </Button>
            <Button
              onClick={handleEquals}
              className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
            >
              =
            </Button>

            <Button
              onClick={() => inputNumber(0)}
              className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              .
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator