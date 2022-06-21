import {
    Card,
    CardHeader,
    CardTitle,
    CardBody
} from "@progress/kendo-react-layout";

const CardDetail = ({ data }) => {
    return (
        <div className="text-center">
            <Card
                style={{
                    width: 260,
                    boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                    marginTop: "15px",
                }}
            >
                <CardHeader
                    className="k-hbox"
                    style={{ background: "transparent" }}
                >
                    <div>
                        <CardTitle style={{ marginBottom: "4px", textDecoration: "underline" }}>
                            <h3>  {data?.Title ?? ""}</h3>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardBody>
                    <div >
                        <b>{data?.Info ?? ""} </b>
                        <br />
                        <div style={{ backgroundColor: "aliceblue" }}> 
                            <small>{data?.foot ?? ""}</small>
                        </div>
                    </div>
                </CardBody >
            </Card >
        </div >

    )
}

export default CardDetail