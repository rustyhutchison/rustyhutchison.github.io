var TodoList3 = React.createClass({
  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          <div>key: { item['.key'] }</div>
          <div>Category: { item.category}</div>
          <div>Price: { item.price }</div>
          <div>Name: { item.name }</div>
          <div><span onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
                  Delete Player
          	</span>
          </div>
        </li>
      );
    };
    return <ul>{ this.props.products.map(createItem) }</ul>;
  }
});

var TodoApp3 = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      items: [],
      category: '',
      price: '',
      name: '',
      stocked: false
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
        name: this.state.name,
        stocked: this.state.stocked
      });
      this.setState({
        category: '',
      	price: '',
      	name: '',
      	stocked: false
      });
    }
    
  },

  render: function() {
    return (
      <div>
        <SearchBar 
                	filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                 />
        <TodoList3 products={ this.state.products } removeItem={ this.removeItem } />
        <form onSubmit={ this.handleSubmit }>
          <div>Category: <input onChange={ this.onChange } value={ this.state.category } name="category"/></div>
          <div>Price: <input onChange={ this.onChange } value={ this.state.price } name="price"/></div>
          <div>Name: <input onChange={ this.onChange } value={ this.state.name } name="name"/></div>
		  <div className="col-sm-9">
				<label htmlFor="stocked">In Stock?</label>
				<select onChange={ this.onChange } id="stocked" name="stocked" className="form-control standalone" type="select" label="Select" placeholder="select">
					<option value="True">True</option>
					<option value="False">False</option>
				</select>
		  </div>
          <button>{ 'Add #' + (this.state.items.length + 1) }</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<TodoApp3 />, document.getElementById('todoApp3'));