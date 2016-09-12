
var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    render: function() {
        var _this = this;
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>${this.props.product.price}</td>
            </tr>
            <div><span onClick={ _this.props.removeItem.bind(null, product['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
                  Delete Player
          	</span>
          </div>
        );
    }
});

var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            
            if (product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} removeItem={this.props.removeItem}/>);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked
        );
    },
    
    render: function() {
        return (
            <form>
                <input 
                	type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                 />
                <p>
                    <input 
                    	type="checkbox"
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    
      mixins: [ReactFireMixin],

    
    getInitialState: function() {
        return {
            filterText: '',
            inStockOnly: false
        };
    },

	componentWillMount: function() {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com/demo/products');
    this.bindAsArray(firebaseRef.limitToLast(25), 'products');
  },

	removeItem: function(key) {
    var firebaseRef = new Firebase('https://sweltering-fire-7944.firebaseio.com/demo/products');
    firebaseRef.child(key).remove();
  },
	
	handleUserInput: function(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },
    
    render: function() {
        return (
            <div>
            	<h1>header</h1>
                <SearchBar 
                	filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                 />
                <ProductTable 
                	products={this.state.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    removeItem=(this.removeItem)
                 />
            </div>
        );
    }
});


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
    <FilterableProductTable />,
    document.getElementById('container')
);