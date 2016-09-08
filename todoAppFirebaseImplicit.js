


var TodoList3 = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          <div>key: { item['.key'] }</div>
          <div>first name: { item.first}</div>
          <div>position: { item.position }</div>
          <div>height: { item.height }</div>
          <div><span onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
                  Delete Player
          	</span>
          </div>
        </li>
      );
    };
    return <ul>{ this.props.prospects.map(createItem) }</ul>;
  }
});

var TodoApp3 = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      name: '',
      position: '',
      height: '',
    };
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com');
    this.bindAsArray(firebaseRef.limitToLast(25), 'prospects');
  },

  nameChange: function(e) {
    this.setState({name: e.target.value});
  },
  
  onChange2: function(e) {
    this.setState({position: e.target.value});
  },
  
  onChange3: function(e) {
    this.setState({height: e.target.value});
  },

  removeItem: function(key) {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.name && this.state.name.trim().length !== 0) {
      this.firebaseRefs['prospects'].push({
        name: this.state.name,
        position: this.state.position, // "name:" changes the input attribute category
        height: this.state.height
      });
      this.setState({
        name: '',
        position: '',
        height: ''
      });
    }
    this.state.name = String.Empty;
    this.state.position = String.Empty;
    this.state.height = String.Empty;
  },

  render: function() {
    return (
      <div>
        <TodoList3 prospects={ this.state.prospects } removeItem={ this.removeItem } />
        <form onSubmit={ this.handleSubmit }>
          <div>Name: <input onChange={ this.nameChange } value={ this.state.name } /></div>
          <div>Position: <input onChange={ this.onChange2 } value={ this.state.position } /></div>
          <div>Height: <input onChange={ this.onChange3 } value={ this.state.height } /></div>
          <button>{ 'Add #' + (this.state.items.length + 1) }</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<TodoApp3 />, document.getElementById('todoApp3'));