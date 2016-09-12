

var ProductInput = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      category: '',
      price: '',
      name: '',
      stocked: ''
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
      	stocked: 'True'
      });
    }
    $("button").click(function() {
    	$('select').prop('selectedIndex', 0);
		});
  },

  render: function() {
    return (
      <div className="col-sm-9 text-left">
      	<h2>Input Products</h2>
        <form onSubmit={ this.handleSubmit }>
		  <div className="">
				<label >Category</label>
				<select onChange={ this.onChange } name="category" className="form-control standalone" type="select" label="Select" placeholder="select">
		   		    <option value="" defaultValue>Select</option>
			        <option value="Sporting Goods">Sporting Goods</option>
					<option value="Electronics">Electronics</option>
					<option value="Auto Parts">Auto Parts</option>
				</select>
		  </div>          
          <div>Name: <input onChange={ this.onChange } value={ this.state.name } name="name"/></div>
		  <div>Price: <input onChange={ this.onChange } value={ this.state.price } name="price"/></div>
		  <div className="">
				<label >In Stock?</label>
				<select onChange={ this.onChange } name="stocked" className="form-control standalone" type="select" label="Select" placeholder="select">
					<option value="" defaultValue>Select</option>
					<option value="True">True</option>
					<option value="">False</option>
				</select>
		  </div>
          <button className="btn-default" >{ 'Add #' + (this.state.products.length + 1) }</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<ProductInput />, document.getElementById('productInput'));