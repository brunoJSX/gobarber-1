import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isField, setIsField] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsField(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container isField={isField} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  )
}

export default Input
