import * as _ from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import {loadWidget} from '../actions'

class WidgetForm extends React.Component<any, any> {
    componentDidMount() {
        this.props.loadWidget(this.props.params.id);
    }

    render() {
        return <form>
            <h1>Update {this.props.widget.name}</h1>
            <div><strong>Cost: </strong><input defaultValue={this.props.widget.cost} /></div>
        </form>
    }
}

function mapStateToProps(state, ownProps) {
    return {
        widget: _.get(state, `entities.widgets.${ownProps.params.id}`, {}),
    }
}

export default connect(mapStateToProps, {
  loadWidget,
})(WidgetForm)
