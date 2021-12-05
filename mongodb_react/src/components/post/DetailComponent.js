import React from 'react';
import styled from 'styled-components';
import RoundedButton from "../../components/common/button/RoundedButton";
import {BsTrashFill, BsGearFill} from 'react-icons/bs';
import LoadingComponent from '../common/loading/LoadingComponent';


const DetailWrap = styled.div`
    padding-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DetailContainer = styled.div`
    width: 70rem;
`;


const DetailTitle = styled.div`
    font-size: 3rem;
    font-weight: bolder;
    text-align: left;
    width: 100%;
`;

const DetailTitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DetailIconWrap = styled.div`
    display: flex;
    align-items: center;
`;

const DetailHR = styled.hr`
    margin: 2rem 0;
`;

const DetailContent = styled.div`
    font-size: 2rem;
    min-height: 20rem;
`;

const ButtonWrap = styled.div`
    display: flex;
    width: 100%;
    /* text-align: right; */
    justify-content: right;
`;

const StyledBackButton = styled(RoundedButton)`
    background: grey;
    width: 20rem;
`;

const StyledGearIcon = styled(BsGearFill)` // 설정
    color: grey;
    font-size: 1.7rem;
    cursor: pointer;
`;

const StyledTrashIcon = styled(BsTrashFill)`  //삭제하기
    color: grey;
    font-size: 1.7rem;
    margin-left: 0.5rem;
    cursor: pointer;
`;



function DetailComponent({ 
    data, 
    loading, 
    onClickBack, 
    onClickCreate, 
    onClickDelete,
    profile,
 }) {
    // data = null <- data.title undefined error!!!
    // data = {title, content}
    console.log(profile);
    return (
        <>
        {loading ? (
            <LoadingComponent />
        ) :(
            data && (
                <DetailWrap>
                    <DetailContainer>
                        <DetailTitleWrap>
                            <DetailTitle>{data.title}</DetailTitle>
                            <DetailIconWrap>
                                { profile && 
                                    (profile._id === data.writer ? (
                                        // 작성자
                                            <>
                                             <StyledGearIcon onClick={onClickCreate} />
                                             <StyledTrashIcon onClick={onClickDelete} />

                                            </>
                                        ) :(
                                        // 비작성자
                                            <></>
                                    ))}    
                            </DetailIconWrap>
                        </DetailTitleWrap>
                        <DetailHR />
                            <DetailContent 
                                dangerouslySetInnerHTML={{ __html: data.content }}
                            />
                        <ButtonWrap>
                            <StyledBackButton onClick={onClickBack}>
                                뒤로가기
                            </StyledBackButton>
                        </ButtonWrap> 
                    </DetailContainer>
                </DetailWrap>
            )
        )}
        </>
    );
}

export default DetailComponent;
