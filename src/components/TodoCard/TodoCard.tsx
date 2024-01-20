import { format } from 'date-fns'
import {
  PriorityIconColor,
  TodoBadgeTextStyle,
  TodoCardStyle,
} from './TodoCard.style'
import { Badge, Button, Tooltip } from 'antd'
import { completedBadgeColor, completedBadgeText } from './TodoCard.util'
import {
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  FireFilled,
} from '@ant-design/icons'

export type TodoCardProps = {
  id: string
  title: string
  description: string
  createDate: string
  priority: 1 | 2 | 3
  completed: boolean
  onComplete: () => void
  onDelete: () => void
  onEdit: () => void
}

export const TodoCard = ({
  id,
  title,
  description,
  createDate,
  priority,
  completed,
  onComplete,
  onDelete,
  onEdit,
}: TodoCardProps): JSX.Element => {
  const getPriorityIcons = (priority: 1 | 2 | 3): any[] => {
    const icons = []

    for (var i = 0; i < priority; i++) {
      icons.push(
        <FireFilled key={i} className={PriorityIconColor({ priority })} />
      )
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
        <div className="flex justify-between h-max w-full mt-2">
          {!completed ? (
            <>
              <Tooltip title="Editar">
                <Button
                  shape="circle"
                  icon={<EditFilled />}
                  style={{ color: '#ca8a04', borderColor: '#ca8a04' }}
                  onClick={onEdit}
                />
              </Tooltip>
              <Tooltip title="Completar">
                <Button
                  shape="circle"
                  icon={<CheckOutlined />}
                  style={{ color: '#a3e635', borderColor: '#a3e635' }}
                  onClick={onComplete}
                />
              </Tooltip>
            </>
          ) : (
            <></>
          )}
          <Tooltip title="Excluir">
            <Button
              shape="circle"
              icon={<CloseOutlined />}
              style={{ color: '#ef4444', borderColor: '#ef4444' }}
              onClick={onDelete}
            />
          </Tooltip>
        </div>
      </div>
    </Badge.Ribbon>
  )
}
