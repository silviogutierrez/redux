import * as React from 'react'
import { connect } from 'react-redux'
import { loadRepo, loadStargazers, loadWidgets } from '../actions'
import {default as TRepo} from '../components/Repo'
import {default as TUser} from '../components/User'
import {default as TList} from '../components/List'
import WidgetList from '../components/WidgetList.tsx'
import {Widget, State} from '../interfaces';

import _ from 'lodash';

function loadData(props) {
  const { fullName } = props
  props.loadRepo(fullName, [ 'description' ])
  props.loadStargazers(fullName)
}


let User = TUser as any;
let Repo = TRepo as any;
let List = TList as any;

interface Props {
    repo: any;
    fullName: string;
    name: string;
    owner: any;
    stargazers: any[];
    stargazersPagination: any;
    loadRepo: Function;
    loadStargazers: Function;
    loadWidgets: Function;
    widgets: Widget[];
}

class RepoPage extends React.Component<Props, any> {
  constructor(props) {
    super(props)
    this.renderUser = this.renderUser.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    this.props.loadWidgets();
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick() {
    this.props.loadStargazers(this.props.fullName, true)
  }

  renderUser(user) {
    return (
      <User as any user={user}
            key={user.login} />
    )
  }

  render() {
    const { repo, owner, name } = this.props
    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>
    }

    const { stargazers, stargazersPagination } = this.props
    return (
      <div>
        <Repo repo={repo}
                    owner={owner} />
        <hr />
        <List renderItem={this.renderUser}
              items={stargazers}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
              {...stargazersPagination} />
        <WidgetList widgets={this.props.widgets}></WidgetList>
      </div>
    )
  }
}

function mapStateToProps(state: State, ownProps) {
  const { login, name } = ownProps.params
  const {
    pagination: { stargazersByRepo },
    entities: { users, repos, widgets }
  } = state

  const fullName = `${login}/${name}`
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] }
  const stargazers = stargazersPagination.ids.map(id => users[id])

  return {
    widgets: _.values<Widget>(widgets),
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  }
}

export default connect(mapStateToProps, {
  loadRepo,
  loadStargazers,
  loadWidgets,
})(RepoPage)
