/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import {
    Accordion, AccordionDetails, AccordionSummary,
    CircularProgress,
    MenuItem,
    Select,
} from "@mui/material";
import "chart.js/auto"
import { useDispatch, useSelector } from "react-redux"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { toast } from "react-toastify";

import Graph from "./Graph";
import { setGraphData } from "../redux/reducers/reducerSlice";
import axios from "axios";

function ListOfRepoes() {
    const dispatch = useDispatch();
    const [developer, setDeveloper] = useState("");



    const loading = useSelector((store) => store.loading);
    const data = useSelector((store) => store.data);



    function handleToGetDataOfByOwnerAndRepoName(developer) {
        setDeveloper(developer);
        let Activity = "commit_activity";
        const { full_name } = developer;
        let [owner, repo] = full_name.split("/");
        let defaultCommitsPerDays = [14, 35, 2, 22, 42, 1, 0];
        const url = `https://api.github.com/repos/${owner}/${repo}/stats/${Activity}`;

        axios.get(url).then((res) => {
            console.log(res.data.length)
            if (res.data?.length > 0) {
                dispatch(setGraphData(res.data.slice(0, 7)[0].days));
                return;
            }
            dispatch(setGraphData(defaultCommitsPerDays))
        }).catch((error) => {
            toast.error(`Error is :${error.message}`)
        })

    }

    function formatTime(time) {
        if (time) {
            let formatedTime = time.split("T")[0];
            return formatedTime
        }
    }

    return (
        <div className="list">
            {
                data.map((obj) =>
                    <Accordion className="eachRepo" key={obj.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className="summaryPart"
                            onClick={() => handleToGetDataOfByOwnerAndRepoName(obj)}
                        >

                            <div className="accordian-title">
                                <div className="img-box">
                                    <img src={obj?.owner?.
                                        avatar_url
                                    } alt="" />
                                </div>
                                <div className="left-of-title">
                                    <h2>{obj?.name}</h2>
                                    <h4>{obj?.description}</h4>
                                    <div className="lower-of-title">
                                        <div className="stars-issue">
                                            <div>
                                                Stars:{obj?.
                                                    stargazers_count}
                                            </div>
                                            <div>Issues:{obj?.open_issues_count}</div>
                                        </div>
                                        <div className="push-time">Last pushed time at:{formatTime(obj?.pushed_at)} by <strong>{obj?.name}</strong> </div>
                                    </div>
                                </div>
                            </div>

                        </AccordionSummary>
                        <AccordionDetails className="description">
                            <div style={{ display: "flex", flexDirection: "column" }}>


                                <Select
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className="all-selects-of-list"
                                    autoFocus={false}
                                    value={"commit"}
                                >
                                    <MenuItem value="commit">commit</MenuItem>
                                    <MenuItem value="additions">addition</MenuItem>
                                    <MenuItem value="deletions">deletion</MenuItem>

                                </Select>



                                <div className="graph1">
                                    <Graph />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                )
            }
            {
                loading &&
                <CircularProgress color="inherit" />
            }
        </div>
    )
}

export default ListOfRepoes
