const React = require('react')
// require('./flex-row.css')


class FlexRow extends React.Component {
  render() {
    const { children, attrs={} } = this.props

    return <div className="FlexRow" {...attrs}>{children}</div>
  }
}


module.exports = FlexRow
