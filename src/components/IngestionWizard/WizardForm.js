import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  handleSubmit(){
    console.log('ale')
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Basic Form</strong> Elements
              </div>
              <div className="card-block">
                {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
                {page === 2 &&
                  <WizardFormSecondPage
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                  />}
                {page === 3 &&
                    <WizardFormThirdPage
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                    />}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm
