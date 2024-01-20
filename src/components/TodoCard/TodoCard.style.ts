import { cva } from 'class-variance-authority'

export const TodoCardStyle = cva(
  [
    'flex',
    'flex-col',
    'gap-2',
    'justify-center',
    'p-2',
    'h-max',
    'w-full',
    'rounded',
    'shadow-lg',
    'border-black',
  ],
  {
    variants: {
      completed: {
        true: 'bg-green-100 border-[1px] border-green-600',
        false: 'bg-yellow-50 border-[1px] border-yellow-600',
      },
    },
  }
)

export const TodoBadgeTextStyle = cva(['font-mono'], {
  variants: {
    completed: {
      true: 'text-green-800',
      false: 'text-yellow-800',
    },
  },
})

export const PriorityIconColor = cva([], {
  variants: {
    priority: {
      1: 'text-green-500',
      2: 'text-amber-500',
      3: 'text-red-500',
    },
  },
})
