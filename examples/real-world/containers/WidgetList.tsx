import * as _ from 'lodash';

import * as React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import {loadWidgets} from '../actions'

class WidgetList extends React.Component<any, any> {
    componentDidMount() {
        this.props.loadWidgets();
    }

    render() {
        return <div>
            {this.props.widgets.map(w => <h3><Link to={`/widgets/${w.id}/`}>{w.name}</Link></h3>)}
        </div>
    }
}

function mapStateToProps(state, ownProps) {
  return {
      widgets: _.values(state.entities.widgets),
  }
}

export default connect(mapStateToProps, {
  loadWidgets,
})(WidgetList)
