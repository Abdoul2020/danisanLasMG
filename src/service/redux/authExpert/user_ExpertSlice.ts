import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"






// expert login
export const get_Expert_Image = createAsyncThunk("Expert/get_Expert_Image", async(data:any) => {

    console.log("setDataImage::", data)

    const res = await axios.get(`https://backend.megaverse.coach/experts/${data.userId}/download`).then((res)=>{

        console.log("imageSuccess", res)
        

    return res

    }).catch((err)=>{

        return { status: err.response.status};

    })

    return res

})



const user_ExpertSlice = createSlice({

    name: "expert_user",
    initialState: {
        value: {},
        status: "",
        errors: null,
        pro_base64:null
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
        .addCase(get_Expert_Image.pending, (state) => {

            state.status = 'loading';

          })
          .addCase(get_Expert_Image.fulfilled, (state, action: any) => {
            console.log("okkHere", action )
            if (action.payload.status === 400 || action.payload.status === 500) {
              state.status = 'error';
              state.errors = action.payload.data;

            }

 else {
                state.status="success"
                state.pro_base64= action.payload.data && action.payload.data

            }
          })

          .addCase(get_Expert_Image.rejected, (state, action) => {

            state.status = 'error';

          });

    }
})


export const { statusReset, updateUser } = user_ExpertSlice.actions
export default user_ExpertSlice.reducer;



