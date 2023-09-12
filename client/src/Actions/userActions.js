import axios from 'axios'

export const loginUser=(email,password)=>async (dispatch )=>{
    try {

        dispatch({
            type:"loginRequest"
        })

        const {data}=await axios.post("/api/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        dispatch({
            type:"loginSuccess",
            payload:data.user,
        })
        
    } catch (error) {

        dispatch({
            type:"loginFailure",
            payload: error.response.data.message,
        })
    }
}
export const registerUser = (name, email, password,city,avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "registerRequest",
      });

      const { data } = await axios.post(
        "/api/register",
        { name, email, password, city,avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "registerSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "registerFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "loadUserRequest",
      });
  
      const { data } = await axios.get("/api/me");
  
      dispatch({
        type: "loadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "loadUserFailure",
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "logoutUserRequest",
      });
  
      await axios.get("/api/logout");
  
      dispatch({
        type: "logoutUserSuccess",

      });
    } catch (error) {
      dispatch({
        type: "logoutUserFailure",
        payload: error.response.data.message,
      });
    }
  };

