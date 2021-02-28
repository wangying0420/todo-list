import { css } from '@linaria/core'
import { useCallback } from 'react'

export function Item(props: { text: string; index: number; onDelete: (index: number) => void }) {
  const handleClick = useCallback(() => {
    props.onDelete(props.index)
  }, [props.onDelete, props.index])

  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      {props.text}
      <button onClick={handleClick}>X</button>
    </div>
  )
}
