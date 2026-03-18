import { EventHandler, useState } from "react"

type Props<T extends (...args: any[]) => any | EventHandler<any>> = {
  queryFunc: T;
}

type QueryState = {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
}

export default function useHttpRequest<T extends (...args: any[]) => any | EventHandler<any>> ({ queryFunc}: Props<T>) {

  const [state, setState] = useState<QueryState>({
    status: "idle",
  })

  const trigger = async (...args: Parameters<T>) : Promise<ReturnType<T>> => {
    try {
      setState({ status: "loading" })
      const res = await queryFunc(...args)
      setState({ status: "success" })
      return res as ReturnType<T>
    } catch (error: any) {
      setState({
        status: "error",
        error: error.message || "Something went wrong",
      })
      throw error
    }
  }


  return {
    trigger,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    error: state.error,
  }
}