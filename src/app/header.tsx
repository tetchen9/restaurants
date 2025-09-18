import styled from 'styled-components'
import IconUser from '@/theme/icons/user.svg?react'
import IconHamburger from '@/theme/icons/hamburger.svg?react'
import IconLogoUrl from '@/theme/icons/logo.svg'

const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url("${IconLogoUrl}");
  background-repeat: no-repeat;
  background-size: 2rem;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.2rem;
  padding: ${({ theme: {space} }) => `${space.xxs} ${space.m}`};
`

export const AppHeader = (): JSX.Element => {
  return (
    <Wrapper>
      <IconUser aria-label='Member icon'     
        tabIndex={0}
        role="button"
      />
      <Logo />
      <IconHamburger aria-label='Menu icon'     
        tabIndex={0}
        role="button"
      />
    </Wrapper>
  )
}
