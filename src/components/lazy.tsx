import React, { Component, type ComponentType } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined type='loading' style={{ fontSize: 24 }} spin />

interface State {
  component: ComponentType<any> | null
}

const asyncComponent = <P extends object>(importComponent: () => Promise<{ default: ComponentType<P> }>) => {
  return class AsyncComponent extends Component<P, State> {
    constructor(props: P) {
      super(props)
      this.state = {
        component: null,
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({
        component,
      })
    }

    render() {
      const Component = this.state.component
      return Component != null ? <Component {...this.props} /> : <Spin indicator={antIcon} />
    }
  }
}

export default asyncComponent
