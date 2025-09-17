import styled from 'styled-components'

export const Container = styled.main`
  margin: 0 auto 16px;
  padding: 0;
  width: 100%;
  max-width: 100vw;

  @media ${({theme}) => theme.device.tablet} {
    max-width: 800px;
  }
`
