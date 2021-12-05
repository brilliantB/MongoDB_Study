import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import DetailComponent from '../../components/post/DetailComponent';

const baseURL = "http://localhost:3000";


function DetailContainer({ profile }) {
    const history = useHistory();
    const params = useParams();
    const { postId } = params;
    // console.log(postId);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //axios
        async function getData() {
            setLoading(true);
        try{
            const response = await axios({
                method: "GET",
                url:`${baseURL}/ssac/board/${postId}`,
            });
            // console.log(response);
            if (response.status === 200) {
                const result = response.data.data;
                setData(result);
                setLoading(false);
                // console.log(result);
            }
        } catch (error) {
            // console.log(error);
            setLoading(false);
        }
        }

        getData();
    }, []);


    // 설정하기
    const onClickCreate = () => {

    };

    const onClickDelete = async () => {
        const token = localStorage.getItem("accessToken");

        try{
            const response = await axios({
                url:`${baseURL}/ssac/board/${postId}`,
                method: "DELETE",
                headers: {
                    Authorization: token,
                },

            });
            if (response.status === 200) {
                console.log("삭제 성공");
                history.goBack();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onClickBack = () => {
        history.goBack();
    };

    return (
        <DetailComponent
            data={data}
            loading={loading}
            onClickBack={onClickBack}
            onClickCreate={onClickCreate}
            onClickDelete={onClickDelete}
            profile={profile}
        />
    );
}

export default DetailContainer;
