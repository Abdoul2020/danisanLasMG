import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import BASE_URL from "../../common/apis/Api";





// expert login
export const forgetPasswordAsync = createAsyncThunk("passwordReset/forgetPasswordAsync", async(data:any) => {
    const res = await axios.post(`https://backend.megaverse.coach/auth/expert/forgot-password`,{
        expert_forgot_password_email: data.email
    }).then((res)=>{


        if(res.data.user.expert_role && res.data.user.expert_role ==="expert"){
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem("AElog", FBIdToken);
            axios.defaults.headers.common["Authorization"] = FBIdToken;
            return  { status:res.status, data:res.data };

        }else{
            return { status: 403 };
        }

    }).catch((err)=>{


        return { status: err.response.status};

    })

    return res

})


const loginSlice = createSlice({
    name: "login",
    initialState: {
        value: {},
        status: "",
        errors: null
    },
    reducers: {
        statusReset(state) {
            state.status = "";
        },
        updateUser: (state, action) => {
            console.log(action);
        },
    },


    // loginUser set
    extraReducers:(builder)=> {
        builder
        .addCase(forgetPasswordAsync.pending, (state) => {

            state.status = 'loading';

          })

          .addCase(forgetPasswordAsync.fulfilled, (state, action: any) => {
            console.log("okkHere", action )
            if (action.payload.status === 400 || action.payload.status === 500) {
              state.status = 'error';
              state.errors = action.payload.data;

            }else if(action.payload.status && action.payload.status === 403){
                state.status="No Permission"
            }
            else {
                state.status="success"
                console.log("lazim olan bilgiler", action.payload.data);
            }
          })

          .addCase(forgetPasswordAsync.rejected, (state, action) => {

            state.status = 'error';

           
          });
      
       

    }
})

export const { statusReset, updateUser } = loginSlice.actions
export default loginSlice.reducer;



