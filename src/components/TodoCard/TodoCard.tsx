import { format } from 'date-fns'
import {
  PriorityIconColor,
  TodoBadgeTextStyle,
  TodoCardStyle,
} from './TodoCard.style'
import { Badge } from 'antd'
import { completedBadgeColor, completedBadgeText } from './TodoCard.util'
import { FireFilled } from '@ant-design/icons'

export type TodoCardProps = {
  title: string
  description: string
  createDate: string
  priority: 1 | 2 | 3
  completed: boolean
}

export const TodoCard = ({
  title,
  description,
  createDate,
  priority,
  completed,
}: TodoCardProps): JSX.Element => {
  const getPriorityIcons = (priority: 1 | 2 | 3): any[] => {
    const icons = []

    for (var i = 0; i < priority; i++) {
      icons.push(<FireFilled className={PriorityIconColor({ priority })} />)
    }

    return icons
  }

  return (
    <Badge.Ribbon
      text={
        <span className={TodoBadgeTextStyle({ completed })}>
          {completedBadgeText[`${completed}`]}
        </span>
      }
      color={completedBadgeColor[`${completed}`]}
    >
      <div className={TodoCardStyle({ completed })}>
        <span className="font-mono font-bold text-[15px]">{`${format(createDate, 'dd/MM/yyyy hh:mm')}hr`}</span>
        <div className="flex justify-between h-max w-full">
          <h1 className="font-bold">{title}</h1>
          <div className="flex gap-2">
            {getPriorityIcons(priority).map((icon) => {
              return icon
            })}
          </div>
        </div>

        <span>{description}</span>
      </div>
    </Badge.Ribbon>
  )
}
