import * as _ from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import {loadWidget} from '../actions'

class WidgetDetail extends React.Component<any, any> {
    componentDidMount() {
        this.props.loadWidget(this.props.params.id);
    }

    render() {
        return <div>
            <h1>{this.props.widget.name}</h1>
            <div><strong>Cost: </strong>{this.props.widget.cost}</div>
        </div>
    }
}

function mapStateToProps(state, ownProps) {
    return {
        widget: _.get(state, `entities.widgets.${ownProps.params.id}`, {}),
    }
}

export default connect(mapStateToProps, {
  loadWidget,
})(WidgetDetail)
