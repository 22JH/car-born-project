/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import car1 from "../../assets/car1.jpg";
import squareCar0 from "../../assets/squareCar1.jpg";
import squareCar1 from "../../assets/squareCar2.png";
import squareCar2 from "../../assets/squareCar3.png";
import { ScrollTrigger, gsap } from "gsap/all";
import { useEffect } from "react";
import { useRef } from "react";

const container = css`
  height: 110vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .menu {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .menu > hr {
    width: 10px;
    background-color: #d23131;
    height: 2px;
    margin-bottom: 30px;
  }
`;

const buttons = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    margin: 0;
    padding: 0;
  }

  .rectangleBtns {
    display: flex;
    flex-direction: row;
    margin-bottom: 5vh;
    padding: 0;
  }

  .mainRectangleBtn {
    height: 50vh;
    width: 20vw;
    margin: 0 20px 0 20px;
    padding: 0;
    background-color: #f6f6f6;
    border-radius: 10px;
    position: relative;
    display: inline-block;
    text-align: center;
    overflow: hidden;

    .icon {
      height: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .name {
      display: flex;
      height: 10%;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bolder;
      z-index: 1;
      position: relative;
    }
    .description {
      position: relative;
      height: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px 0 20px;
      font-size: 20px;
      text-align: center;
      font-weight: 500;
      color: #a8a8a8;
      z-index: 1;
    }

    .click {
      height: 10%;
      font-size: 1rem;
      font-weight: bold;
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a8a8a8;
    }

    .redBox {
      height: 10%;
      width: 100%;
      position: absolute;
      background-color: red;
      transition: all 0.3s;
    }
    &:hover {
      cursor: pointer;
      transition: all 0.3s;

      .btnImg {
        opacity: 1;
      }

      .description {
        color: white;
        transition: all 0.3s;
        z-index: 3;
      }

      .name {
        color: white;
      }
      svg {
        fill: white;
        transition: all 0.3s;
        z-index: 3;
      }
      .click {
        color: white;
        z-index: 3;
      }
      .redBox {
        z-index: 2;
        transform: translateY(-100%);
        transition: all 0.3s;
      }
    }
  }

  .btnImg {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    transition: opacity 0.5s ease;
  }

  .squareBtns {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
  .squareBtn {
    background-color: #f6f6f6;
    height: 28vh;
    width: 20vw;
    margin: 0 20px 0 20px;
    border-radius: 10px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    transition: all 0.8s;
    font-size: 28px;
    cursor: pointer;

    &:hover {
      .name {
        font-size: 30px;
        transition: all 0.3s;
      }
    }
  }

  .squareBtn0 {
    background-image: url(${squareCar0});
    background-size: cover;
  }
  .squareBtn1 {
    background-image: url(${squareCar1});
    background-size: cover;
  }
  .squareBtn2 {
    background-image: url(${squareCar2});
    background-size: cover;
  }
`;

interface btns {
  icon: jsx.JSX.Element;
  name: string;
  description: string;
  url: string;
}

type btnType = btns[];

export default function HomeMainMenu() {
  const containerRef = useRef(null);
  const icon1 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="50%"
      width="50%"
      viewBox="0 0 490 490">
      <g>
        <path d="M224.777,305.082H405.12c3.99,0,7.599-2.372,9.181-6.036l74.88-173.406c1.335-3.09,1.024-6.644-0.825-9.457   c-1.849-2.814-4.989-4.507-8.355-4.507H129.393l-20.676-63.188c-1.345-4.11-5.179-6.891-9.504-6.891H10c-5.523,0-10,4.478-10,10   c0,5.522,4.477,10,10,10h81.964l77.413,236.595c1.345,4.11,5.18,6.891,9.504,6.891h23.403l-28.482,54.688   c-3.65-0.958-7.48-1.473-11.428-1.473c-24.841,0-45.051,20.21-45.051,45.052c0,24.843,20.21,45.055,45.051,45.055   c21.402,0,39.356-15.011,43.916-35.055h176.654c4.561,20.044,22.511,35.055,43.912,35.055c24.845,0,45.058-20.212,45.058-45.055   c0-24.842-20.213-45.052-45.058-45.052c-21.4,0-39.352,15.009-43.912,35.052H206.29c-2.193-9.639-7.481-18.108-14.766-24.309   L224.356,306C224.514,305.698,224.653,305.391,224.777,305.082z M266.737,131.675h53.877l-28.801,66.698h-53.877L266.737,131.675z    M216.152,198.374h-53.871l28.794-66.698h53.877L216.152,198.374z M313.599,198.374l28.801-66.698h53.873l-28.801,66.698H313.599z    M358.835,218.374l-28.805,66.708h-53.873l28.805-66.708H358.835z M283.177,218.374l-28.805,66.708h-53.875l28.804-66.708H283.177z    M398.546,285.082h-46.73l28.805-66.708h46.731L398.546,285.082z M435.987,198.374h-46.73l28.801-66.698h46.731L435.987,198.374z    M169.292,131.675l-18.975,43.951l-14.381-43.951H169.292z M164.304,218.374h43.213l-24.584,56.934L164.304,218.374z    M162.374,428.404c-13.813,0-25.051-11.239-25.051-25.055c0-13.813,11.237-25.052,25.051-25.052   c13.812,0,25.049,11.238,25.049,25.052C187.423,417.165,176.186,428.404,162.374,428.404z M426.856,378.297   c13.816,0,25.058,11.238,25.058,25.052c0,13.815-11.241,25.055-25.058,25.055c-13.81,0-25.045-11.239-25.045-25.055   C401.811,389.536,413.047,378.297,426.856,378.297z" />
      </g>
    </svg>
  );
  const icon2 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="50%"
      width="50%"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512 512">
      <g>
        <g>
          <path d="M200.348,233.739c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696s16.696-7.49,16.696-16.696    C217.043,241.229,209.554,233.739,200.348,233.739z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M311.652,367.304c-9.206,0-16.696,7.49-16.696,16.696s7.49,16.696,16.696,16.696s16.696-7.49,16.696-16.696    S320.858,367.304,311.652,367.304z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M256,122.435c-107.402,0-194.783,87.381-194.783,194.783S148.598,512,256,512s194.783-87.381,194.783-194.783    S363.402,122.435,256,122.435z M150.261,250.435c0-27.619,22.468-50.087,50.087-50.087c27.619,0,50.087,22.468,50.087,50.087    c0,27.619-22.468,50.087-50.087,50.087C172.729,300.522,150.261,278.054,150.261,250.435z M196.968,399.87    c-3.261,3.261-7.533,4.892-11.804,4.892s-8.544-1.631-11.804-4.892c-6.521-6.521-6.521-17.087,0-23.609l141.663-141.674    c6.521-6.521,17.087-6.521,23.609,0c6.521,6.521,6.521,17.087,0,23.609L196.968,399.87z M311.652,434.087    c-27.619,0-50.087-22.468-50.087-50.087s22.468-50.087,50.087-50.087c27.619,0,50.087,22.468,50.087,50.087    S339.271,434.087,311.652,434.087z" />
        </g>
      </g>
      <g>
        <g>
          <path d="M322.783,66.783h-5.833c0.175-1.843,0.268-3.699,0.268-5.565C317.217,27.468,289.75,0,256,0s-61.217,27.468-61.217,61.217    c0,1.867,0.094,3.722,0.268,5.565h-5.833c-9.217,0-16.696,7.479-16.696,16.696v33.44c25.717-10.759,53.905-16.745,83.478-16.745    c29.57,0,57.761,5.986,83.478,16.745v-33.44C339.478,74.261,332,66.783,322.783,66.783z M283.196,66.783h-54.392    c-0.424-1.848-0.63-3.706-0.63-5.565c0-15.348,12.478-27.826,27.826-27.826s27.826,12.478,27.826,27.826    C283.826,63.076,283.619,64.935,283.196,66.783z" />
        </g>
      </g>
    </svg>
  );
  const icon3 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="50%"
      width="50%"
      viewBox="0 0 373.031 373.031">
      <g>
        <path d="M62.367,77.501c2.761,0,5-2.239,5-5V49.659c0-5.214,4.242-9.457,9.457-9.457h54.86v20.07H90.001c-2.761,0-5,2.239-5,5   v258.21c0,2.761,2.239,5,5,5h193.66c2.761,0,5-2.239,5-5V65.272c0-2.761-2.239-5-5-5h-41.311v-20.07h53.871   c5.205,0,9.44,4.244,9.44,9.46v270.39c0,2.761,2.239,5,5,5s5-2.239,5-5V49.662c0-10.73-8.721-19.46-19.44-19.46h-53.871v-7.869   c0-2.761-2.239-5-5-5h-19.737C211.219,6.709,199.535,0,187.017,0s-24.202,6.709-30.596,17.333h-19.737c-2.761,0-5,2.239-5,5v7.869   h-54.86c-10.729,0-19.457,8.728-19.457,19.457v22.843C57.367,75.263,59.606,77.501,62.367,77.501z M136.684,81.333h57.001   c2.761,0,5-2.239,5-5s-2.239-5-5-5h-52.001v-44h17.71c1.917,0,3.667-1.097,4.501-2.823C168.158,15.696,177.234,10,187.017,10   s18.859,5.696,23.122,14.51c0.835,1.726,2.584,2.823,4.501,2.823h17.71v44h-19.666c-2.761,0-5,2.239-5,5s2.239,5,5,5h24.666   c2.761,0,5-2.239,5-5v-6.061h36.311v248.21H95.001V70.272h36.683v6.061C131.684,79.095,133.922,81.333,136.684,81.333z" />
        <path d="M62.373,83.953c-2.761,0-5,2.239-5,5v6.818c0,2.761,2.239,5,5,5s5-2.239,5-5v-6.818   C67.373,86.191,65.134,83.953,62.373,83.953z" />
        <path d="M310.664,332.755c-2.761,0-5,2.239-5,5v15.827c0,5.21-4.239,9.449-9.449,9.449H76.822c-5.21,0-9.449-4.239-9.449-9.449   V112.223c0-2.761-2.239-5-5-5s-5,2.239-5,5v241.359c0,10.724,8.725,19.449,19.449,19.449h219.393   c10.724,0,19.449-8.725,19.449-19.449v-15.827C315.664,334.994,313.425,332.755,310.664,332.755z" />
        <path d="M258.352,279.582H117.648c-2.761,0-5,2.239-5,5s2.239,5,5,5h140.704c2.761,0,5-2.239,5-5S261.113,279.582,258.352,279.582z   " />
        <path d="M258.352,219.044H117.648c-2.761,0-5,2.239-5,5s2.239,5,5,5h140.704c2.761,0,5-2.239,5-5S261.113,219.044,258.352,219.044z   " />
        <path d="M117.648,259.461h16.549c2.761,0,5-2.239,5-5s-2.239-5-5-5h-16.549c-2.761,0-5,2.239-5,5S114.887,259.461,117.648,259.461z   " />
        <path d="M157.344,259.461c2.761,0,5-2.239,5-5s-2.239-5-5-5h-8.824c-2.761,0-5,2.239-5,5s2.239,5,5,5H157.344z" />
        <path d="M258.352,249.461h-86.91c-2.761,0-5,2.239-5,5s2.239,5,5,5h86.91c2.761,0,5-2.239,5-5S261.113,249.461,258.352,249.461z" />
        <path d="M117.825,198.775h75.688c2.761,0,5-2.239,5-5s-2.239-5-5-5h-75.688c-2.761,0-5,2.239-5,5S115.064,198.775,117.825,198.775z   " />
        <path d="M258.352,188.775h-50.768c-2.761,0-5,2.239-5,5s2.239,5,5,5h50.768c2.761,0,5-2.239,5-5S261.113,188.775,258.352,188.775z" />
        <path d="M258.352,158.506H117.648c-2.761,0-5,2.239-5,5s2.239,5,5,5h140.704c2.761,0,5-2.239,5-5S261.113,158.506,258.352,158.506z   " />
        <path d="M143.642,138.148c-4.582,0.06-21.386,0.06-26.058,0c-2.761-0.035-4.971-2.302-4.936-5.063   c0.035-2.761,2.29-4.944,5.063-4.936c9.253,0.118,16.729,0.118,25.801,0c2.75-0.022,5.028,2.173,5.064,4.935   C148.612,135.845,146.403,138.112,143.642,138.148z" />
        <path d="M261.335,129.174c0.029,0.022,0.082,0.062,0.11,0.084c1.672,1.317,2.327,3.548,1.632,5.56   c-0.694,2.012-2.586,3.364-4.714,3.368c-14.243,0.033-80.108,0.021-98.859-0.037c-2.758-0.009-4.989-2.249-4.984-5.008   c0.004-2.758,2.242-4.992,5-4.992h98.783C259.424,128.149,260.453,128.479,261.335,129.174z" />
        <circle cx="186.831" cy="30.396" r="9.75" />
      </g>
    </svg>
  );
  const icon4 = (
    <svg
      version="1.1"
      id="REPAIR"
      width="50%"
      height="50%"
      viewBox="0 0 1800 1800"
      fill="black">
      <g>
        <g>
          <path d="M803.722,820.892l-247.878-247.87l71.705-71.702l247.875,247.871l40.808-40.802L655.949,448.104    l74.925-74.921c0.596-0.596,1.147-1.216,1.682-1.86c0.592-0.499,1.175-1.006,1.735-1.562l135.512-135.512    c11.126-11.12,11.292-29.106,0.366-40.43l-1.538-1.606c-1.284-1.349-2.572-2.693-3.893-4.018    C796.995,120.454,709.056,80.01,629.497,80.01c-53.655,0-99.814,17.796-133.483,51.468c-0.733,0.73-1.409,1.503-2.053,2.3    c-0.443,0.388-0.89,0.765-1.309,1.183L185.294,442.324c-11.267,11.271-11.267,29.539,0,40.81l45.403,45.399l-37.493,37.493    l-45.403-45.408c-5.414-5.41-12.752-8.453-20.405-8.453c-7.652,0-14.99,3.043-20.404,8.453L12.869,614.75    c-11.268,11.271-11.268,29.538,0,40.802l197.415,197.416c5.414,5.41,12.752,8.454,20.404,8.454c7.653,0,14.995-3.043,20.405-8.454    l94.115-94.13c11.268-11.264,11.268-29.531,0-40.802l-45.395-45.399l37.493-37.493l45.395,45.399    c5.636,5.636,13.019,8.446,20.405,8.446c7.383,0,14.77-2.818,20.401-8.446l79.124-79.124l260.285,260.285L803.722,820.892z     M629.497,137.719c58.812,0,124.33,28.287,178.733,76.497l-94.34,94.334L559.981,154.64    C579.485,143.503,603.046,137.719,629.497,137.719z M230.688,791.756L74.079,635.15l53.317-53.321l156.602,156.605    L230.688,791.756z M261.089,629.749l-24.999-24.999l35.408-35.408l24.998,24.998L261.089,629.749z M403.106,619.331    L246.505,462.725L513.058,196.17l156.609,156.612L403.106,619.331z" />
          <path d="M1763.996,1556.146l-593.695-593.688l-40.803,40.801l573.296,573.296l-71.701,71.709l-573.303-573.303    l-40.803,40.81l593.704,593.705c5.41,5.408,12.752,8.452,20.401,8.452c7.657,0,14.999-3.044,20.409-8.452l112.502-112.521    C1775.268,1585.686,1775.268,1567.418,1763.996,1556.146z" />
        </g>
        <path d="M1780.444,264.271c-3.269-9.372-11.135-16.4-20.812-18.614c-9.67-2.206-19.806,0.708-26.825,7.729   l-116.585,116.576l-109.307-109.315l116.585-116.57c7.02-7.021,9.942-17.156,7.729-26.833c-2.214-9.679-9.243-17.541-18.614-20.814   c-29.071-10.149-59.48-15.298-90.379-15.298c-73.062,0-141.743,28.449-193.397,80.104c-51.671,51.66-80.123,120.344-80.123,193.406   c0,35.343,6.723,69.648,19.442,101.514l-736.242,736.236c-31.861-12.721-66.158-19.435-101.497-19.435   c-73.058,0-141.744,28.452-193.407,80.115c-73.802,73.801-99.243,185.193-64.809,283.775c3.272,9.372,11.134,16.4,20.812,18.614   c9.673,2.206,19.809-0.7,26.833-7.72l116.581-116.586l109.315,109.299l-116.585,116.586c-7.021,7.02-9.938,17.155-7.729,26.833   c2.214,9.677,9.242,17.534,18.613,20.812c29.064,10.152,59.468,15.296,90.372,15.304c0.008,0,0.008,0,0.016,0   c73.042,0,141.728-28.46,193.39-80.122c79.559-79.566,99.726-196.352,60.563-294.822l736.347-736.333   c31.865,12.728,66.162,19.443,101.506,19.443c0.008,0,0,0,0.008,0c73.046,0,141.736-28.444,193.391-80.106   C1789.438,474.246,1814.878,362.854,1780.444,264.271z M583.011,1599.065c-40.762,40.763-94.948,63.216-152.58,63.216   c0,0-0.012,0-0.016,0c-7.915-0.008-15.792-0.436-23.602-1.28l100.137-100.138c5.414-5.417,8.454-12.752,8.454-20.408   c0-7.648-3.04-14.99-8.454-20.4L356.83,1369.946c-11.263-11.264-29.535-11.264-40.806,0l-100.072,100.072   c-6.835-64.134,15.333-129.603,61.871-176.146c40.762-40.762,94.952-63.207,152.597-63.207c57.64,0,111.83,22.445,152.588,63.215   C667.146,1378.013,667.146,1514.926,583.011,1599.065z M659.282,1288.535l-70.945-70.951l702.501-702.488l70.953,70.944   L659.282,1288.535z M1674.832,507.246c-40.761,40.753-94.951,63.199-152.596,63.199S1410.394,548,1369.632,507.238   c-40.753-40.762-63.207-94.953-63.207-152.597s22.454-111.834,63.216-152.598c40.753-40.758,94.951-63.204,152.596-63.204   c7.922,0,15.796,0.429,23.605,1.28l-100.137,100.127c-5.411,5.41-8.453,12.752-8.453,20.4c0,7.657,3.042,14.991,8.453,20.401   l150.108,150.117c11.271,11.271,29.547,11.271,40.81,0.008l100.072-100.073C1743.531,395.234,1721.367,460.704,1674.832,507.246z" />
      </g>
    </svg>
  );
  // const  icon5 = ( )
  const rectangles: btnType = [
    {
      icon: icon1,
      name: "사기",
      description: "블록체인으로 기록되는 안전한 거래를 이용해 보세요!",
      url: "/",
    },
    {
      icon: icon2,
      name: "팔기",
      description: "블록체인으로 기록되는 안전한 거래를 이용해 보세요!",
      url: "/",
    },
    {
      icon: icon3,
      name: "커뮤니티",
      description: "다양한 사람들과 함께 내 차를 공유해 보asdfasdf세요",
      url: "/",
    },
  ];

  const squares: btnType = [
    {
      icon: icon4,
      name: "내 차 등록하기",
      description: "블록체인으로 기록되는 안전한 거래를 이용해 보세요!",
      url: "/",
    },
    {
      icon: icon4,
      name: "검수 및 정비 예약 신청",
      description: "블록체인으로 기록되는 안전한 거래를 이용해 보세요!",
      url: "/",
    },
    {
      icon: icon4,
      name: "마이페이지",
      description: "다양한 사람들과 함께 내 차를 공유해 보asdfasdf세요",
      url: "/",
    },
  ];

  useEffect(() => {
    if (!containerRef) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline().from(".mainRectangleBtn", {
      duration: 1,
      opacity: 0,
      y: -200,
      ease: "ease",
    });
    ScrollTrigger.create({
      target: ".mainRectangleBtn",
      scrub: 2,
      start: "bottom top",
      end: "bottom 50%",
      animation: tl,
    });

    gsap.to(".mainMenuHr", {
      width: "50%",
      duration: 1,
      ease: "circ",
      scrollTrigger: {
        trigger: ".mainMenuHr",
        scrub: 5,
        start: "-180 20%",
        end: "-180 20%",
        id: "hrTag",
      },
    });
  }, [containerRef]);
  return (
    <div css={container} ref={containerRef}>
      <div className="menu">
        <p
          css={{
            fontSize: "2.5rem",
            marginTop: "80px",
            marginBottom: "20px",
            fontWeight: "bolder",
          }}>
          Menu
        </p>
        <hr className="mainMenuHr" />
      </div>
      <div css={buttons}>
        <div className="rectangleBtns">
          {rectangles.map((rect: btns, idx: number): any => (
            <div
              className={`mainRectangleBtn mainRectangleBtn${idx}`}
              key={idx}>
              <div className="icon">{rect.icon}</div>
              <div className="name">{rect.name}</div>
              <div className="description">{rect.description}</div>
              <div className="click">Click</div>
              <div className="redBox" />
              <img src={car1} className="btnImg" alt="사진" />
            </div>
          ))}
        </div>
        <div className="squareBtns">
          {squares.map((rect: btns, idx: number): any => (
            <div className={`squareBtn${idx} squareBtn`} key={idx}>
              <div className="name">{rect.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
