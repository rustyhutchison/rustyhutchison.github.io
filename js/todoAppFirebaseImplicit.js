

var ProductInput = React.createClass({
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
      <div className="product-input text-left">
        <form onSubmit={ this.handleSubmit }>
          <div>Category: <input onChange={ this.onChange } value={ this.state.category } name="category"/></div>
          <div>Price: <input onChange={ this.onChange } value={ this.state.price } name="price"/></div>
          <div>Name: <input onChange={ this.onChange } value={ this.state.name } name="name"/></div>
		  <div className="">
				<label >In Stock?</label>
				<select onChange={ this.onChange } name="stocked" className="form-control standalone" type="select" label="Select" placeholder="select">
					<option value="True">True</option>
					<option value="False">False</option>
				</select>
		  </div>
          <div className="btn-default" >{ 'Add #' + (this.state.items.length + 1) }</div>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<ProductInput />, document.getElementById('productInput'));