


export type errorType = string | null 
export type RequestStatusType = "succeeded" | 'loading'

export type AppReducerType = {
    appStatus: RequestStatusType
    error: errorType
}

const initialState: AppReducerType = {
  appStatus: "succeeded" as RequestStatusType,
  error: null as errorType,
}