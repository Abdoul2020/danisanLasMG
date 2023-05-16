import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"





export const expert_getInfo = createAsyncThunk(
    'Expert/expert_getInfo',
    async () => {
      try {
        const token = localStorage.getItem('AElog');
        if (typeof token !== 'string') {
          throw new Error('Invalid token');
        }
        const response = await axios.get('https://backend.megaverse.coach/auth/expert/profile', {
          headers: { 'Authorization': token },
        });
        return response.data;
      } catch (error:any) {
        console.error('profilDataError:', error);
        return { status: error.response.status };
      }
    }
  );


const expert_ProfileSlice = createSlice({

    name: "expert_user",
    initialState: {
        value: {},
        status: "",
        getExpertStatus:"",
        errors: null,
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
        .addCase(expert_getInfo.pending,(state, action:any)=>{
            state.getExpertStatus="loading";
          })
          .addCase(expert_getInfo.fulfilled, (state, action: any) => {
           
            if (action.payload.status === 400 || action.payload.status === 500) {
        
              state.getExpertStatus = 'error';
              state.errors = action.payload.data;
        
            }
        
        else {
            console.log("seedtata", action.payload)
                state.getExpertStatus="success"
                state.value= action.payload && action.payload
              
        
            }
          })
          .addCase(expert_getInfo.rejected, (state, action) => {
        
            state.getExpertStatus = 'error';
        
          })
    }

})


export const { statusReset, updateUser } = expert_ProfileSlice.actions
export default expert_ProfileSlice.reducer;





