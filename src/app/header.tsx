import styled from 'styled-components'
import IconUser from '@/theme/icons/user.svg?react'
import IconHamburger from '@/theme/icons/hamburger.svg?react'
import IconLogoUrl from '@/theme/icons/logo.svg'


const Wrapper = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.color.blank};
`

const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url("${IconLogoUrl}");
  background-repeat: no-repeat;
  background-size: 2rem;
`

const Inner = styled.div`
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
      <Inner>
        <IconUser aria-label='Member icon' />
        <Logo />
        <IconHamburger aria-label='Menu icon' />
      </Inner>
    </Wrapper>
  )
}
