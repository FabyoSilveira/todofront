import { Input as AntdInput, InputProps } from 'antd'
import { TextAreaStyle } from './TextArea.style'

export type TextAreaProps = InputProps & {
  label: string
  hasError: boolean | string | undefined
  errorMessage: string | undefined
}

const { TextArea: AntdTextArea } = AntdInput

export const TextArea = ({
  label,
  hasError,
  errorMessage,
  ...props
}: TextAreaProps): JSX.Element => {
  return (
    <div className={TextAreaStyle()}>
      <span className="font-mono font-bold">{label}</span>
      <AntdTextArea {...(props as any)} status={hasError ? 'error' : ''} />
      {hasError ? (
        <span className="text-[15px] text-red-400">{errorMessage}</span>
      ) : (
        ''
      )}
    </div>
  )
}
