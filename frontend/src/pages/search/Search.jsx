import { useEffect, useState } from "react";
import { searchProductApi } from "../../apis/Api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from "../../components/card/Card";

const Search = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(query);

    useEffect(() => {
        searchProductApi(searchQuery)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchQuery}`);
        window.location.reload();
    };

    return (
        <section className="container mt-3">
            <div className="d-flex align-items-center justify-content-between">
                <h4>Search</h4>
                <form action="" className="w-25" onSubmit={handleSearch}>
                    <input type="text" name="" id="" placeholder="Search" className="form-control" onChange={(e) => setSearchQuery(e.target.value)} />
                </form>
            </div>
            <div>
                <p>
                    <b>Result for: </b> {searchQuery}
                </p>

                <div className="row row-cols-1 row-cols-md-4 g-4 row">
                    {(products.length &&
                        products.map((product) => {
                            return <Card key={product._id} {...product} />;
                        })) || <h4>No products found</h4>}
                </div>
            </div>
        </section>
    );
};
export default Search;
