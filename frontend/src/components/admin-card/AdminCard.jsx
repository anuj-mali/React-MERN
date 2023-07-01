const AdminCard = (props) => {
    return (
        <>
            <div class={`card text-white bg-${props.bgcolor} mb-3`} style={{ maxWidth: "18rem" }}>
                <div class="card-header">Total {props.title}</div>
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </>
    );
};
export default AdminCard;
