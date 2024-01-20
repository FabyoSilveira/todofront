import { InputStyle } from './Input.style'
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd'

export type InputProps = AntdInputProps & {
  label: string
  hasError: boolean | string | undefined
  errorMessage: string | undefined
}

export const Input = ({
  label,
  hasError,
  errorMessage,
  ...props
}: InputProps): JSX.Element => {
  return (
    <div className={InputStyle()}>
      <span className="font-mono font-bold">{label}</span>
      <AntdInput {...props} status={hasError ? 'error' : ''} />
      {hasError ? (
        <span className="text-[15px] text-red-400">{errorMessage}</span>
      ) : (
        ''
      )}
    </div>
  )
}
