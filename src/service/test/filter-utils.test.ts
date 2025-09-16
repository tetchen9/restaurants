import { sanitiseParam } from '../filter-utils'

describe('sanitiseParam', () => {
  it('should replace spaces with plus signs and trim the trailing spaces', () => {
    const input = 'Chris Colgan '
    const result = sanitiseParam(input)
    expect(result).toEqual('Chris+Colgan')
  })

  it('should remove special characters', () => {
    const input = '?Chris&='
    const result = sanitiseParam(input)
    expect(result).toEqual('Chris')
  })
})
