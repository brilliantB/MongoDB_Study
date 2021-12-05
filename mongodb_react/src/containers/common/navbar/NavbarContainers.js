import React, { useEffect, useState } from "react";
import NavbarComponent from "../../../components/common/navbar/NavbarComponents";
import { useHistory } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:3000";

function NavbarContainer({ isLoggined, setIsLoggined, profile }) {
  const history = useHistory();

  const [searchState, setSearchState] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    search: "",
  });
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchInfo.search.length > 0) {
      // 타이핑 하고 있다.
      setSearchState(true);
    } else {
      // 입력값이 없다면
      setSearchState(false);
    }
  }, [searchInfo]);

  const onClickAutoComplete = (text) => {
    const originText = text[0].replace("<em>", "").replace("</em>", "");
    setSearchInfo({
      ...searchInfo,
      search: originText,
    });
  };

  const onChangeInput = async (event) => {
    // 검색어 입력
    const { name, value } = event.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });

    // axios
    // 자동 완성 api
    // url : /ssac/search
    console.log(searchInfo.search);
    try {
      const result = await axios({
        method: "GET",
        url: `${baseURL}/ssac/search`,
        params: {
          q: value, // query string
        },
      });
      console.log(result);
      if (result.status === 200) {
        const elsData = result.data.data;
        console.log(elsData);
        setSearchData(elsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSearch = () => {
    // axios
  };

  const onClickSignout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggined(false);
    history.push("/");
  };

  const onClickHome = () => {
    history.push("/");
  }

  return (
    <NavbarComponent
      profile={profile}
      onClickAutoComplete={onClickAutoComplete}
      searchData={searchData}
      searchState={searchState}
      onClickSearch={onClickSearch}
      onChangeInput={onChangeInput}
      searchInfo={searchInfo}
      isLoggined={isLoggined}
      onClickSignout={onClickSignout}
      onClickHome={onClickHome}
    />
  );
}

export default NavbarContainer;