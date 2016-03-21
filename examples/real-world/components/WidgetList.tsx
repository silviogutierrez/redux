import * as React from 'react';
import {Widget} from '../interfaces';

interface Props {
    widgets: Widget[];
}

export default class WidgetList extends React.Component<Props, any> {
    render() {
        return <div>
            {this.props.widgets.map(widget => <div>{widget.name}</div>)}
        </div>
    }
}
