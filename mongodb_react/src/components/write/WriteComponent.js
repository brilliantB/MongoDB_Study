import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import RoundedButton from '../common/button/RoundedButton';


const WriteWrap = styled.div`
    width: 80rem;
`;

const TitleInput = styled.input`
    font-size: 2rem;
    font-weight: bolder;
    outline: none;
    padding: 1rem;
    border: 1px solid grey;
    width: 100%;
    border-radius: 0.5rem;
    box-sizing : border-box;
    margin-bottom:2rem;
`;

const QuillWrap = styled.div`
    .ql-editor {
        min-height: 30rem;
        line-height: 1.5;
    }
`;
const ButtonWrap = styled.div`
    text-align: right;
`;

const StyledSubmitButton = styled(RoundedButton)`
    width: 20rem;
`;

const StyledCancelButton = styled(RoundedButton)`
    width: 20rem;
    background: grey;
    margin-right: 1rem;
`;

function WriteComponent({onChangeBody, body, title, onChangeInput, onClickSubmit}) {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);


    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme : "snow",
            placeholder: "내용을 작성해주세요",
            modules: {
                toolbar: [
                    [{header: "1"}, {header: "2"}],
                    ["bold", "italic", "underline", "strike"],
                    [{list: "ordered"}, {list: "bullet"}],
                    ["blockquote", "code-block", "link", "image"],
                ],
            },
        });

        const quill = quillInstance.current;
        quill.on("text-change", (delta, oldDalta, source) => {
            if (source === "user"){
                onChangeBody(quill.root.innerHTML);
            }
        });
    }, []);


    const mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);


    return ( 
    <WriteWrap>
        <TitleInput name={"title"} value={title} onChange={onChangeInput} />
        <QuillWrap>
            <div ref={quillElement} />
        </QuillWrap>
        <ButtonWrap>
            <StyledCancelButton>취소</StyledCancelButton>
            <StyledSubmitButton onClick={onClickSubmit}>제출</StyledSubmitButton>
        </ButtonWrap>
    </WriteWrap>
    );
}

export default WriteComponent;
