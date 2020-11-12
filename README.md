# Blog/Server

## Authentication Endpoints

### POST /log_in

    input {
    	@Max(254)
    	email: string,

    	@Max(100)
    	@Min(8)
    	password: string
    }

    expected status: 200
    output {
    	token: "jwt string containing your username and _id",
    }

### POST /sign_up

    input {
    	@Max(254)
    	email: string,

    	@Max(55)
    	@Min(2)
    	username: string,

    	@Max(100)
    	@Min(8)
    	password: string
    }

    expected status: 201
    output {
    	message: string
    }
