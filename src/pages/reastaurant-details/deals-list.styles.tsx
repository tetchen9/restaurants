import styled from 'styled-components'

export const DealsSection = styled.div`

`

export const DealCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.color.gray};
  
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.color.lightGray};
  }
`

export const DealContent = styled.div`
  flex: 1;
`

export const DealHeader = styled.div`
  display: flex;
  align-items: center;
`

export const DiscountText = styled.span`
  ${({ theme }) => theme.typography.h3};
  font-weight: bold;
  color: ${({ theme }) => theme.color.jasperRed};
  margin-right: 0.5rem;
`

export const DealMeta = styled.div`
  color: ${({ theme }) => theme.color.gray};
`

export const RedeemButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.color.jasperRed};
  border: 2px solid ${({ theme }) => theme.color.jasperRed};
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  ${({ theme }) => theme.typography.bodyBold};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.jasperRedLight};
    color: ${({ theme }) => theme.color.ghostWhite};
  }
`
