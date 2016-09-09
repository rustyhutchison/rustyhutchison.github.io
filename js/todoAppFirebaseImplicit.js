


var TodoList3 = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          <div>key: { item['.key'] }</div>
          <div>first name: { item.category}</div>
          <div>position: { item.price }</div>
          <div>height: { item.name }</div>
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
      category: '',
      price: '',
      stocked: '',
      name: ''
    };
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com/demo/products');
    this.bindAsArray(firebaseRef.limitToLast(25), 'products');
  },

  onChange: function(e) {
    var nextState = {};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  },
  

  removeItem: function(key) {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com/demo/products');
    firebaseRef.child(key).remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.name && this.state.name.trim().length !== 0) {
      this.firebaseRefs['products'].push({
        category: this.state.category,
        price: this.state.price, // "name:" changes the input attribute category
        name: this.state.name
      });
      this.setState({
        category: '',
      	price: '',
      	name: ''
      });
    }
    this.state.category = String.Empty;
    this.state.price = String.Empty;
    this.state.name = String.Empty;
  },

  render: function() {
    return (
      <div>
        <TodoList3 prospects={ this.state.products } removeItem={ this.removeItem } />
        <form onSubmit={ this.handleSubmit }>
          <div>Name: <input onChange={ this.onChange } value={ this.state.category } name="category"/></div>
          <div>Position: <input onChange={ this.onChange } value={ this.state.price } name="price"/></div>
          <div>Height: <input onChange={ this.onChange } value={ this.state.name } name="name"/></div>
          <button>{ 'Add #' + (this.state.items.length + 1) }</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<TodoApp3 />, document.getElementById('todoApp3'));