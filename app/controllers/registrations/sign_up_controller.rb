# frozen_string_literal: true

module Registrations
  class SignUpController < Clearance::UsersController
    layout 'session'
  end
end
