
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
            	<td>{this.props.product.category}</td>
                <td onClick={ this.props.removeItem.bind(null, _this.props.product['.key']) } style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
                  X
          		</td>
            </tr>
            
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
            
            
            rows.push(<ProductRow product={product} key={product.name} removeItem={this.props.removeItem } />);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th id="price">Price</th>
                        <th>Category</th>
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

var InventoryList = React.createClass({
    
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
            <div className="text-left">
            	<h2>Filterable Inventory</h2>
                <SearchBar 
                	filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                 />
                <ProductTable 
                	products={this.state.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    removeItem={ this.removeItem }
                 />
            </div>
        );
    }
});

 
ReactDOM.render(
    <InventoryList />,
    document.getElementById('inventoryList')
);