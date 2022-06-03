# frozen_string_literal: true

module Authentications
  class ApplicationController < ::ApplicationController
    before_action :skip_if_login

    protected

    def skip_if_login
      return unless signed_in?

      redirect_to root_path
    end
  end
end
