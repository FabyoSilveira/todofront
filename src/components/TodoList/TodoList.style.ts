import { cva } from 'class-variance-authority'

export const TodoListStyle = cva(
  [
    'flex',
    'flex-col',
    'px-4',
    'py-4',
    'w-full',
    'gap-4',
    'max-h-[600px]',
    'overflow-y-scroll',
    'overflow-x-hidden',
    'shadow-2xl',
    'rounded-lg',
    'bg-white',
  ],
  {
    variants: {},
  }
)
